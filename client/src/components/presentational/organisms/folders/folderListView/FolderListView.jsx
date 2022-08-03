import React from "react";
import FolderListViewItem from "./FolderListViewItem";
import * as S from "./styles";
import { MyDropdown } from "../../../../presentational";
import { Checkbox } from "../../../../presentational";
import { BsChevronDown } from "react-icons/bs";

const FolderListView = (props) => {
  const {
    dropdownButtonsData,
    sortFilter,
    checkFile,
    sortedData,
  } = props;
  if (!sortedData.length) {
    return <S.NotFound>Files not found</S.NotFound>;
  }

  return (
    <S.ListView>
      <S.HeaderStyle>
        <S.HeaderLeftContainer>
          <S.CheckboxContainer>
            <Checkbox />
          </S.CheckboxContainer>
          <S.HeaderFolderImg
            src="https://s3.amazonaws.com/media-p.slid.es/uploads/644286/images/3450303/folder.png"
            alt="folder icon"
          />
          <MyDropdown
            buttonClick={sortFilter}
            dropdownButtonsData={dropdownButtonsData.sortButtonsData}
            noHover
          >
            <S.HeaderTitle>
              <div>Name</div>
              <S.HeaderIcon>
                <BsChevronDown />
              </S.HeaderIcon>
            </S.HeaderTitle>
          </MyDropdown>
        </S.HeaderLeftContainer>
        <MyDropdown
          noHover
          buttonClick={sortFilter}
          dropdownButtonsData={dropdownButtonsData.modifiedButtonsData}
        >
          <S.ModContainer>
            <S.HeaderModified>
              <div>Modified</div>
              <S.HeaderIcon>
                <BsChevronDown />
              </S.HeaderIcon>
            </S.HeaderModified>
          </S.ModContainer>
        </MyDropdown>
        <MyDropdown
          noHover
          buttonClick={sortFilter}
          dropdownButtonsData={dropdownButtonsData.sizeButtonsData}
        >
          <S.SizeContainer>
            <S.HeaderSize>
              <div>Size</div>
              <S.HeaderIcon>
                <BsChevronDown />
              </S.HeaderIcon>
            </S.HeaderSize>
          </S.SizeContainer>
        </MyDropdown>
      </S.HeaderStyle>
      {sortedData.map((element) => (
        <FolderListViewItem
          key={element.id}
          id={element.id}
          title={element.title}
          modified={element.modified}
          size={element.size}
          checkFile={checkFile}
          checked={element.checked}
        />
      ))}
    </S.ListView>
  );
};

export { FolderListView };
