import * as React from "react";
import {Col, Row, Body} from "../styles/grid";
import {Alert, Button, FormRow, Input, Label, Textarea} from "../styles/form";
import {useState} from "react";
import {send} from "emailjs-com";

interface Props {

}

const ContactMe: React.FC<Props> = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [notification, setNotification] = useState<string>();

    const onSuccess = () => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setNotification('Successfully sent your message!');
    };
    const onFail = (err: any) => {
        console.error(err);
        setError("Something went wrong while sending your email. If the form isn't working, please send your email directly to me@ebrouwer.dev.")
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNotification(undefined);
        setError(undefined);
        setLoading(true);
        send('service_rz9caa2', 'template_ij7vj9x', { name, email, phone, message }, 'user_rC6SJrMVgjKyzpUJir367')
            .then(onSuccess)
            .catch(onFail)
            .finally(() => setLoading(false));
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
                    {notification && <FormRow>
                        <Alert>{notification}</Alert>
                    </FormRow>}
                    {error && <FormRow>
                        <Alert error>{error}</Alert>
                    </FormRow>}
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
                            <Button type='submit' disabled={loading}>Send</Button>
                        </Col>
                    </Row>
                </form>
            </Body>
        </Row>
    );
};

export default ContactMe;