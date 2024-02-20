import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { updateLevel } from "../utility/updateLevel";
import { updateNextPracticeDate } from "../utility/updateNextPracticeDate";
import { formatDate } from "../utility/formatDate";
import { dbUpdateCard } from "../utility/databaseFunctions/dbUpdateCard";

const { width: wWidth, height } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];

export const Card = ({ cardData, cards, setCards, db }) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);

  const updateCardsDec = async () => {
    const newLevel = updateLevel(cardData.level, "dec");
    const newNextPracticeDate = updateNextPracticeDate(newLevel);
    const updatedCard = {
      ...cardData,
      level: newLevel,
      nextPracticeDate: newNextPracticeDate,
      lastPracticeDate: formatDate(new Date()),
    };
    try {
      dbUpdateCard(db, updatedCard);

      // sprawdzić co się stanie jeśli będą złe dane
      const updatedCards = cards.map((obj) => {
        if (obj.polish === cardData.polish) {
          return updatedCard;
        }
        return obj;
      });
      setCards(updatedCards);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCardsInc = async () => {
    //param
    const newLevel = updateLevel(cardData.level, "inc"); //inc
    const newNextPracticeDate = updateNextPracticeDate(cardData.level);
    const updatedCard = {
      ...cardData,
      level: newLevel,
      nextPracticeDate: newNextPracticeDate,
      lastPracticeDate: formatDate(new Date()),
    };
    try {
      dbUpdateCard(db, updatedCard);

      const updatedCards = cards.map((obj) => {
        if (obj.polish === cardData.polish) {
          return updatedCard;
        }
        return obj;
      });
      setCards(updatedCards);
    } catch (error) {
      console.log(error);
    }
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      offset.value = { x: translateX.value, y: translateY.value };
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
      scale.value = withTiming(1, {}, () => {
        const isSwipedLeft = dest === -wWidth;
        const isSwipedRight = dest === wWidth;

        if (isSwipedLeft) {
          runOnJS(updateCardsDec)();
        }
        if (isSwipedRight) {
          runOnJS(updateCardsInc)();
        }
      });
      console.log(cards + "cards");
    });

  const threeFingersTap = Gesture.Tap()
    .minPointers(3)
    .onStart(() => {
      console.log("threeFingersTap");
    });

  const composed = Gesture.Exclusive(pan, threeFingersTap);

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const spin = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.card, style]}>
          <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)}>
            <Animated.View style={[styles.front, rStyle]}>
              <Text style={styles.cardText}>{cardData.english}</Text>
            </Animated.View>
            <Animated.View style={[styles.back, bStyle]}>
              <Text style={styles.cardText}>{cardData.polish}</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 300,
    height: 450,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 32,
  },
  front: {
    height: 450,
    width: 300,
    backgroundColor: "#D8D9CF",
    borderRadius: 15,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    height: 450,
    width: 300,
    backgroundColor: "white",
    borderRadius: 15,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
