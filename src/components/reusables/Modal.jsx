import React from "react";
import { useDisclosure , Button, Modal,ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, } from "@chakra-ui/react";
import { ButtonComponent } from "./ButtonComponent";

export const ModalComponent = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { children, modalTitle, btnContent, topPosition='initial', leftPosition='initial' } = props
    return (
      <>
        {/* <Button onClick={onOpen}>Dowload File</Button> */}

        <ButtonComponent onClick={onOpen} btnText={btnContent} ml='20px' py='30px' variant='outline' borderColor='main_light_gray' color='primary-text' />
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent top={topPosition} left={leftPosition} fontFamily='AvertaRegular'>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>
  
            <ModalFooter>
              {/* <Button variantColor="blue" mr={3} onClick={onClose}>
                Close
              </Button> */}
              {/* <Button variant="ghost">Secondary Action</Button> */}
              <ButtonComponent btnText={btnContent} />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }