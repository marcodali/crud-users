import {
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  FormControl,
  ModalBody,
  FormLabel,
  Select,
  Button,
  Modal,
  Input,
  Text,
} from '@chakra-ui/react';
import { useRef, useState, useEffect, useMemo } from 'react';

function MyModal({
  isOpen,
  onClose,
  modalTitle,
  createNewUser,
  updateUser,
  user,
  setSelectedUserId,
}) {
  const initialRef = useRef();
  const emptyForm = useMemo(() => ({
    first_name: '',
    last_name: '',
    birthday: '',
    password: '',
    gender_id: 10,
  }), []);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState({});
  
  useEffect(() => {
    user ? setForm(user) : setForm(emptyForm);
    setError({});
  }, [user, emptyForm]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    let isValid = true;
    isValid = (form.first_name.length < 2) ?  false : isValid;
    isValid = (form.last_name.length < 2) ?   false : isValid;
    isValid = (form.password.length < 8) ?    false : isValid;
    isValid = (!form.birthday) ?              false : isValid;
    const formErrors = isValid ? {} : {
      first_name: (form.first_name.length < 2) ? 'Min length is 2' : '',
      last_name: (form.last_name.length < 2) ? 'Min length is 2' : '',
      password: (form.password.length < 8) ? 'Min length is 8' : '',
      birthday: (!form.birthday) ? 'Not a valid date' : '',
    };
    setError(formErrors);
    return isValid;
  };
  
  const onSubmit = () => {
    if (isFormValid()) {
      user ? updateUser(form) : createNewUser(form);
      setForm(emptyForm);
    }
  };
  
  const onCancel = () => {
    onClose();
    setForm(emptyForm);
    setSelectedUserId(null);
    setError({});
  };
  
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onCancel}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalTitle} {user ? `${user.first_name} ${user.last_name}` : 'User'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                maxLength={50}
                ref={initialRef}
                value={form.first_name}
                name='first_name'
                placeholder='First name'
                onChange={handleChange} />
              <Text fontSize='xs' fontWeight='bold' color="red.500">
                {error.first_name}
              </Text>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                maxLength={50}
                value={form.last_name}
                name='last_name'
                placeholder='Last name'
                onChange={handleChange} />
              <Text fontSize='xs' fontWeight='bold' color="red.500">
                {error.last_name}
              </Text>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                maxLength={50}
                value={form.password}
                name='password'
                placeholder='Password'
                onChange={handleChange} />
              <Text fontSize='xs' fontWeight='bold' color="red.500">
                {error.password}
              </Text>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Birthday</FormLabel>
              <Input
                type='date'
                value={form.birthday}
                name='birthday'
                placeholder='Birthday'
                onChange={handleChange} />
              <Text fontSize='xs' fontWeight='bold' color="red.500">
                {error.birthday}
              </Text>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select value={form.gender_id} name='gender_id' onChange={handleChange}>
                <option value='10'>Male</option>
                <option value='20'>Female</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCancel} mr={3}>Cancel</Button>
            <Button
              onClick={onSubmit}
              colorScheme='blue'
              >
                Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default MyModal;