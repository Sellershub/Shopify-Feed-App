import {Button, Modal, TextContainer, Image} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { instagram, tiktok } from '../../assets/home';
import classes from "./modal.module.css"
import SuccessModal from './SuccessModal';

export default function ModalExample({active,handleChange}) {
//   const [active, setActive] = useState(true);
//   const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button onClick={handleChange}>Open</Button>;
  const [isSuccess, setIsSucces] =  useState(false)

  return (
    // <div style={{height: '500px'}}>
    //   <Modal
    //     activator={activator}
    //     open={active}
    //     onClose={handleChange}
    //     title="Reach more shoppers with Instagram product tags"
    //     primaryAction={{
    //       content: 'Add Instagram',
    //       onAction: handleChange,
    //     }}
    //     secondaryActions={[
    //       {
    //         content: 'Learn more',
    //         onAction: handleChange,
    //       },
    //     ]}
    //   >
    //     <Modal.Section>
    //       <TextContainer>
    //         <p>
    //           Use Instagram posts to share your products with millions of
    //           people. Let shoppers buy from your store without leaving
    //           Instagram.
    //         </p>
    //       </TextContainer>
    //     </Modal.Section>
    //   </Modal>
    // </div>
    <div className={classes.main} onClick={handleChange}>
        <div className={classes.container} onClick={(e)=>{
        e.stopPropagation()

        }}>
            {!isSuccess ? <div className={classes.modal}>
                <h4>Select network</h4>
                <div className={classes.icon}>
                    <Image source={instagram}></Image>
                    <Image source={tiktok}></Image>
                </div>
                <div className={classes.button}>
                    <button className={classes.standartButton} onClick={handleChange}>Cancel</button>
                    <button className={classes.blueButton} onClick={()=>setIsSucces(true)}>Continue</button>
                </div>
            </div> : <div className={classes.successModal}> <SuccessModal/></div>}
        </div>
    </div>

  );
}