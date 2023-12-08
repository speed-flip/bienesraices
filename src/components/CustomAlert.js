import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

const CustomAlert = ({ alerta, title, content, onPress, children }) => {
  return (
    <Portal>
      <Dialog visible={alerta}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{content}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPress}>Ok</Button>
          {children}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default CustomAlert