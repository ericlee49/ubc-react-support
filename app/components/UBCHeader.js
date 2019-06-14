import React from 'react';
import {Grid, Image, Container} from 'semantic-ui-react';

class UBCHeader extends React.Component {
    render() {
        return (
            <Container>
            <Grid divided>
                <div></div>
                <Grid.Column width={2}>
                <Image src='/app/assets/ubc_crest_blue.png' size='mini' centered style={{ marginTop: '2em' , marginBottom: '2em' }}/>
                </Grid.Column>
                <Grid.Column width={7}>
                <Image src='/app/assets/ubc_wordmark_blue.png' size='big' />
                </Grid.Column>
            </Grid>
            </Container>
        )
    }
}

export default UBCHeader;

