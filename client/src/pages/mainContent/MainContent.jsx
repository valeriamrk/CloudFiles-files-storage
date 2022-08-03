import React, { useEffect, useState } from "react";
import {
  ButtonBlock,
  DeleteFolder,
  Flex,
  MyModal,
  RenameFolder,
} from "../../components/presentational";
import { AllFiles } from "../../components/presentational";
import * as S from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { checkOneFile, uncheckAllFiles } from "../../store/foldersDataSlice";
import { filesAPI } from "../../services/api/api";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/dbConnect";

import {
  createDir,
  getAllFiles,
  popToStack,
  setCurrentDir,
  deleteFile,
  checkToDeleteFile,
} from "../../store/filesSlice";
import { useOutletContext } from "react-router-dom";
import { changeViewCheck } from "../../store/dropdownButtonsSlice";

const MainContent = (props) => {
  const { testData, filteredFolders, handleModalState, handleModalStateClose } =
    useOutletContext();

  const currentDir = useSelector((state) => state.filesReducer.currentDir);
  const files = useSelector((state) => state.filesReducer.files);
  const dirStack = useSelector((state) => state.filesReducer.dirStack);
  const checkedToDelete = useSelector(
    (state) => state.filesReducer.checkToDelete
  );
  // const testData = useSelector((state) => state.foldersData.allFolders);
  const modalsData = useSelector((state) => state.modalsData.allModals);
  const dropdownButtons = useSelector((state) => state.dropdownButtonsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFiles({ currentDir }));
    console.log("RENDER COMPONENT");
  }, [currentDir]);

  const fileClickHandler = (id, value) => {
    console.log("fileClickHandler", id, value);
  };
  const folderClickHandler = (id, value) => {
    console.log("folderClickHandler", id, value);
  };

  // тестовый стейт для получения постов

  const [isLoading, setIsLoading] = useState(false);
  const [isShowCommandMenu, setIsShowCommandMenu] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  // 1. Change view: list or grid

  const changeView = (element) => {
    dispatch(changeViewCheck(element.id));

    if (element.value === "Tiles") {
      setIsGridView(true);
    } else if (element.value === "List") {
      setIsGridView(false);
    }
    cancelSelectionFile();
  };

  // 2. Check files

  const [checkedElementsArray, setCheckedElementsArray] = useState([]);
  const [selectedElementsNumber, setSelectedElementsNumber] = useState("");

  const checkFile = (id, checked) => {
    dispatch(checkOneFile({ id, checked }));

    //работает только если данные вне стейта
    //     testData.map((element) => {
    //       if (element.id === id) {
    //         element.checked = !checked;
    //       }
    //       return element;
    //   }
    // );
    // Counting of checked elements

    let transformedArray = [];
    if (!checkedElementsArray.includes(id)) {
      transformedArray = [...checkedElementsArray, id];
    } else {
      transformedArray = checkedElementsArray.filter(
        (element) => element !== id
      );
    }

    // показывать комманд меню или нет

    if (transformedArray.length > 0) {
      setIsShowCommandMenu(true);
    } else {
      setIsShowCommandMenu(false);
    }

    setCheckedElementsArray([...transformedArray]);
    setSelectedElementsNumber(transformedArray.length);
  };

  const cancelSelectionFile = () => {
    dispatch(uncheckAllFiles());

    //работает только если данные вне стейта
    //   const uncheckedFiles = testData.map((element) => {
    //       element.checked = false;
    //     return element
    //   }
    // );
    //   setCheckedElementsArray(uncheckedFiles);
    setIsShowCommandMenu(false);
    setCheckedElementsArray("");
  };

  const backClickHandler = () => {
    const copyOfArray = [...dirStack];
    copyOfArray.pop();
    const lastElementOfArray = copyOfArray.pop();
    dispatch(popToStack());
    dispatch(setCurrentDir(lastElementOfArray));
  };

  const addNewFile = (name, type) => {
    dispatch(createDir({ name, type, currentDir }));
    console.log("newfile", name, type);
  };
  const someButton = async () => {
    console.log("TEST Button");
    const savedUser = localStorage.getItem("user");
    console.log(savedUser);
    // try {
    //   const docRef = await addDoc(collection(db, "Files"), {
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (error) {
    //   console.error("Error adding document: ", error);
    // }

    // try {
    //   const querySnapshot = await getDocs(collection(db, "Files"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //   });
    // } catch (error) {
    //   console.error("Error adding document: ", error);
    // }
  };

  const uploadFile = () => {
    console.log("uploadfile");
  };

  const deleteFileHandler = (e, id) => {
    // e.stopPropagation();
    // dispatch(checkToDeleteFile(id));
    // dispatch(deleteFile(id));
    console.log("deletefile");
  };

  const renameFile = () => {
    console.log("renamefile");
  };

  return (
    <S.MainContent>
      <S.Wrapper>
        <ButtonBlock
          addNewFile={addNewFile}
          uploadFile={uploadFile}
          someButton={someButton}
        />
        <ButtonBlock addNewFile={addNewFile} uploadFile={uploadFile} />
        {/* <Box>
        <MyButton clickButton={() => backClickHandler()}>Back</MyButton>
      </Box> */}
        <S.Title>All files</S.Title>
        <Flex justifyContent="center">
          <AllFiles
            isShowCommandMenu={isShowCommandMenu}
            dropdownButtonsData={dropdownButtons}
            data={testData}
            // data={files}
            isGridView={isGridView}
            checkFile={checkFile}
            changeView={changeView}
            filteredData={filteredFolders}
            clickHandler={changeView}
            selectedElementsNumber={selectedElementsNumber}
            cancelSelectionFile={cancelSelectionFile}
            deleteFileHandler={deleteFileHandler}
            handleModalState={handleModalState}
            handleModalStateClose={handleModalStateClose}
            isLoading={isLoading}
          />
        </Flex>
      </S.Wrapper>
      <MyModal
        modalActive={modalsData[6].opened}
        handleClose={handleModalStateClose}
        modalsData={modalsData}
      >
        <DeleteFolder deleteFileHandler={deleteFileHandler} />
      </MyModal>

      <MyModal
        modalActive={modalsData[7].opened}
        handleClose={handleModalStateClose}
        modalsData={modalsData}
      >
        <RenameFolder renameFile={renameFile} />
      </MyModal>
    </S.MainContent>
  );
};

export { MainContent };
