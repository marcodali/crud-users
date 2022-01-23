import {
  useColorModeValue,
  Divider,
  Spacer,
  chakra,
  Tooltip,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { useState } from 'react';

function User({
  first_name,
  last_name,
  birthday,
  password,
  gender_id,
  user_id,
  setSelectedUserId,
  setIsDeleteDialogOpen,
  openEditModal,
}) {
  const [isShowPasswordEnabled, setShowPasswordEnabled] = useState(false);
  const openDeleteDialog = () => {
    setSelectedUserId(user_id);
    setIsDeleteDialogOpen(true);
  };

  const onOpenEditModal = () => {
    setSelectedUserId(user_id);
    openEditModal();
  };

  const toggleShowPassword = () => {
    setShowPasswordEnabled(!isShowPasswordEnabled);
  };

  return (
    <>
      <Flex width={400} pt={6}>
        <chakra.h2
          fontSize="xl"
          fontWeight="bold"
          color={useColorModeValue("pink")}
        >
          {`${first_name} ${last_name}`}
        </chakra.h2>
        <Tooltip label={gender_id === 10 ? 'Male' : 'Female'}>
          <span>
            <Icon
              as={gender_id === 10 ? CgGenderMale : CgGenderFemale}
              h={6}
              w={6}
              color={useColorModeValue("yellow", "brown")}
              ml={2} />
          </span>
        </Tooltip>
        <Spacer />
        <Tooltip label='Edit'>
          <span>
            <Icon
              as={AiFillEdit}
              h={6}
              w={6}
              mr={1}
              cursor='pointer'
              onClick={onOpenEditModal} />
          </span>
        </Tooltip>
        <Tooltip label='Delete'>
          <span>
            <Icon
              as={AiFillDelete}
              h={6}
              w={6}
              cursor='pointer'
              onClick={openDeleteDialog} />
          </span>
        </Tooltip>
      </Flex>

    <Flex width={400}>
      <Flex
        alignItems="center"
        mt={4}
        color={useColorModeValue("orange")}
      >
        <Icon as={FaBirthdayCake} h={6} w={6} />
        <chakra.h1 px={2} fontSize="sm">
          {birthday}
        </chakra.h1>
      </Flex>
        <Spacer />
        <Flex
        alignItems="center"
        mt={4}
        color={useColorModeValue("orange")}
      >
        <Tooltip label={isShowPasswordEnabled ? 'Hide Password' : 'Show Password'}>
          <span>
            <Icon
              as={isShowPasswordEnabled ? RiLockPasswordLine : RiLockPasswordFill}
              h={6}
              w={6}
              cursor='pointer'
              onClick={toggleShowPassword} />
          </span>
        </Tooltip>
        <chakra.h1 px={2} fontSize="sm">
          {isShowPasswordEnabled ? password : '********'}
        </chakra.h1>
      </Flex>
    </Flex>
    <Divider borderColor="red.200" h={8} />
  </>
  );
};

export default User;