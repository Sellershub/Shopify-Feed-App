
import React from 'react';
import { DisplayText, Card, Image, Link } from "@shopify/polaris";
import classes from "./connect.module.css";

import { NGROK_TUNNEL } from '../../../Constants';
import { instagramIcon, tiktokIcon } from '../../../assets/ConnectAccount';

export const ConnectAccount = ({ goBack, isEditing, selectedAccount }) => {
  const connectInstagram = async () => {

    fetch(
      `${NGROK_TUNNEL}/api/instagram/auth`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    )
      .then((response) =>
        response.json().then((data) => {
          window.open(data.authUri);
        })
      )
      }
  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.cardContentContainer}>
          <div className={classes.title}>
            <DisplayText size="Large">Please select network</DisplayText>
          </div>
          <div className={classes.socialNetworkContainer}>
            <div
              onClick={connectInstagram}
              className={classes.socialElementContainer}
            >
              <Card>
                {/* <Link removeUnderline monochrome url="/Success"> */}
                <div className={classes.socialElementContent}>
                  <Image source={instagramIcon} alt="Instagram" />
                  <p className={classes.networkTitle} size="medium">
                    Instagram
                  </p>
                </div>
                {/* </Link> */}
              </Card>
            </div>
            <div className={classes.socialElementContainer}>
              <Card>
                <Link removeUnderline monochrome url="/Success">
                  <div className={classes.socialElementContent}>
                    <div className={classes.soon}>
                      <p className={classes.soonText}>Soon</p>
                    </div>
                    <Image source={tiktokIcon} alt="TikTok" />
                    <p className={classes.networkTitle}>Tik Tok</p>
                  </div>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
