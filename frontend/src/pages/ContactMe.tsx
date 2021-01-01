import * as React from "react";
import {Col, Row, Body} from "../styles/grid";
import {Button, FormRow, Input, Label, Textarea} from "../styles/form";
import {useState} from "react";

interface Props {

}

const ContactMe: React.FC<Props> = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }

    return (
        <Row style={{justifyContent: 'center'}}>
            <Body>
                <form onSubmit={submit}>
                    <FormRow>
                        <Col style={{textAlign: 'center'}}>
                            <h1>Contact Me</h1>
                        </Col>
                    </FormRow>
                    <FormRow>
                        <Col>
                            <Label>
                                Name
                                <Input value={name} onChange={e => setName(e.target.value)}/>
                            </Label>
                        </Col>
                    </FormRow>
                    <FormRow>
                        <Col style={{marginRight: '15px'}}>
                            <Label>
                                Email
                                <Input value={email} onChange={e => setEmail(e.target.value)}/>
                            </Label>
                        </Col>
                        <Col style={{marginLeft: '15px'}}>
                            <Label>
                                Phone Number
                                <Input value={phone} onChange={e => setPhone(e.target.value)}/>
                            </Label>
                        </Col>
                    </FormRow>
                    <FormRow>
                        <Col>
                            <Label>
                                Message
                                <Textarea value={message} onChange={e => setMessage(e.target.value)}/>
                            </Label>
                        </Col>
                    </FormRow>
                    <Row>
                        <Col>
                            <Button type='submit'>Send</Button>
                        </Col>
                    </Row>
                </form>
            </Body>
        </Row>
    );
};

export default ContactMe;