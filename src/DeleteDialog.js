import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

function DeleteDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  deleteUserAndCloseDeleteDialog,
  setSelectedUserId,
  user,
}) {
  const cancelRef = useRef();
  const onCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedUserId(null);
  };
  return (
    <>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {user?.first_name} {user?.last_name}
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancel}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteUserAndCloseDeleteDialog} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
};

export default DeleteDialog;