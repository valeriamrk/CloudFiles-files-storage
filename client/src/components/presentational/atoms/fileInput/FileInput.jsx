import React from "react";
import * as S from "./styles"

const FileInput = () => {
  return (
    <div>
      <S.FileInput type="file" id="file" />
      <S.Label htmlFor="file">Browse files</S.Label>
    </div>
  );
};

export { FileInput };
