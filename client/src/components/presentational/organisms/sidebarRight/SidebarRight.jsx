import React from "react";
import { InfoBlock, UserCard } from "../../../presentational";
import { Flex } from "../../templates/flex/Flex.styled";

const SidebarRight = (props) => {
  const { handleModalState } = props;
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <UserCard />
      <InfoBlock handleModalState={handleModalState} />
    </Flex>
  );
};

export { SidebarRight };
