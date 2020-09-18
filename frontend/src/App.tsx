import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function App() {
    return (
        <Container>
            <Row>
                <Column style={{textAlign: 'center'}}>
                    <h1>Ethan Brouwer</h1>
                </Column>
            </Row>
        </Container>
    );
}

export default App;
