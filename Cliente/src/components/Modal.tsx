import React, { useContext, useMemo } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ThemeContext } from "../context/theme/ThemeContext";

interface Props {
  referencia: React.MutableRefObject<BottomSheetMethods>;
  children: React.ReactNode;
}

const Modal = ({ referencia, children }: Props) => {
  // variables
  const snapPoints = useMemo(() => ["85%"], []);
  const {
    theme: {
      colors: { background },
    },
  } = useContext(ThemeContext);
  return (
    <BottomSheet
      ref={referencia}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      overDragResistanceFactor={0}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
      }}
      animateOnMount={true}
      backgroundStyle={{
        backgroundColor: background,
      }}>
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </BottomSheet>
  );
};

export default Modal;
