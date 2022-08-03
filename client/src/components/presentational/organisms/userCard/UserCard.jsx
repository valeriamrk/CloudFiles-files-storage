import React from "react";
import * as S from "./styles";

const UserCard = (props) => {

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.Avatar
          src="https://static.vecteezy.com/system/resources/previews/000/420/940/original/avatar-icon-vector-illustration.jpg"
          alt="avatar"
        />
        <S.UserInfo>
          <S.UsernameContent>User Name</S.UsernameContent>
          <S.Description>Active user</S.Description>
        </S.UserInfo>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export { UserCard };
