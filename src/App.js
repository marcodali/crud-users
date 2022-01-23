import React, { useEffect, useState } from 'react';
import {
  useColorModeValue,
  ChakraProvider,
  useDisclosure,
  VStack,
  Spacer,
  theme,
  Text,
  Icon,
  Grid,
  Flex,
  Box,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import User from "./User"
import { MdAddCircle } from "react-icons/md";
import DeleteDialog from "./DeleteDialog";
import { getAllUsers, deleteUser, createUser, updateUser } from './Services';
import MyModal from './Modal';

function App() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userList, setList] = useState([]);
  const [modalTitle, setModalTitle] = useState({});
  const [selectedUserId, setSelectedUserId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      setList(await getAllUsers());
    }
    fetchData();
  }, []);

  const deleteUserAndCloseDeleteDialog = async () => {
    await deleteUser(selectedUserId);
    setIsDeleteDialogOpen(false);
    setList(await getAllUsers());
    setSelectedUserId(null);
  };

  const openModalNewUser = () => {
    setSelectedUserId(undefined);
    setModalTitle('Create New');
    onOpen();
  };

  const createNewUser = async (user) => {
    await createUser(user);
    onClose();
    setList(await getAllUsers());
    setSelectedUserId(null);
  };

  const openModalEditUser = () => {
    setModalTitle('Edit');
    onOpen();
  };

  const onUpdateUser = async (user) => {
    await updateUser(user);
    onClose();
    setList(await getAllUsers());
    setSelectedUserId(null);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Flex width={464}>
              <Spacer />
              <Text>Users list {selectedUserId}</Text>
              <Spacer />
              <Icon
                as={MdAddCircle}
                h={6}
                w={6}
                cursor='pointer'
                onClick={openModalNewUser} />
            </Flex>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('blue')}
              boxShadow='dark-lg'
              pr={8} pl={8}>
                {
                  userList.map(user => {
                    return <User
                      key={user.user_id}
                      {...user}
                      setSelectedUserId={setSelectedUserId}
                      setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                      openEditModal={openModalEditUser}
                    />})
                }
            </Box>
          </VStack>
          <MyModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle={modalTitle}
            updateUser={onUpdateUser}
            createNewUser={createNewUser}
            setSelectedUserId={setSelectedUserId}
            user={userList.find((user) => user.user_id === selectedUserId)} />
          <DeleteDialog
            setSelectedUserId={setSelectedUserId}
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            deleteUserAndCloseDeleteDialog={deleteUserAndCloseDeleteDialog}
            user={userList.find((user) => user.user_id === selectedUserId)} />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
