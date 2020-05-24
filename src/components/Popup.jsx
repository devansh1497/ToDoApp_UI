
import React from 'react';
import {Modal,Button} from 'react-bootstrap'

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show : false,
    };

  }

  handleClose = () => {
      this.setState({
          show : false
        }
      )
  }

  handleShow = () => {
      this.setState({
          show : true
      })
  }

    handleYes = async () => {
        this.props.toggleDeleteModal();
       await this.props.handleDelete(this.props.deleteId)
       await this.props.resetDeleteId();
  }

  render() {
    //   const [show, setShow] = useState(false);
    
    //   const handleClose = () => setShow(false);
    //   const handleShow = () => setShow(true);
    
    const show = this.state;
    const {toggleDeleteModal} = this.props;
      return (
        <>
          
          <Modal show={show} onHide={toggleDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>This will delete the selected item. This action cannot be undone.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleDeleteModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleYes}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}

export default PopUp;