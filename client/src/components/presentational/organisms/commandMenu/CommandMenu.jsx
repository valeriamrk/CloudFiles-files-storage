import React from "react";
import { MyButton } from "../../../presentational";
import * as S from "./styles";
import {
  BsBucket,
  BsPencilSquare,
  BsXLg,
} from "react-icons/bs";

const CommandMenu = (props) => {
  const {
    cancelSelectionFile,
    selectedElementsNumber,
    handleModalState,
  } = props;

  return (
    <S.CommandMenu>
      <S.RightButtons>
        {selectedElementsNumber === 1 ? (
          <MyButton
            clickButton={() => handleModalState({ id: 8 })}
            startIcon={<BsPencilSquare />}
          >
            Rename
          </MyButton>
        ) : (
          <></>
        )}
        <MyButton
          clickButton={() => handleModalState({ id: 7 })}
          startIcon={<BsBucket />}
        >
          Delete
        </MyButton>
      </S.RightButtons>

      <S.LeftButtons>
        <MyButton clickButton={cancelSelectionFile} endIcon={<BsXLg />}>
          Selected: {selectedElementsNumber}
        </MyButton>
      </S.LeftButtons>
    </S.CommandMenu>
  );
};

export { CommandMenu };
