import React from "react"
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
import { Dimensions } from "react-native"
import { useState } from "react"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"

const windowHeight = Dimensions.get("window").height;

export const SC999_V03_Example = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Button onPress={() => setShowModal(true)}>Button</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Modal Title</Modal.Header>
                    <Modal.Body>
                        作成済みのソースコードを全て削除しますか？
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button>キャンセル</Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                OK
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                {/* <SC999_V02_Example /> */}
            </Center>
        </NativeBaseProvider>
    )
}
