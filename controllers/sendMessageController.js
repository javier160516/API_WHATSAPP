import wbm from 'wbm';

const sendMessage = async (req, res) => {
    const contacts = req.body;
    if (Object.values(contacts).length == 0) {
        const error = new Error('No se ha mandado ningún parámetro');
        return res.status(400).json({ 
            msg: error.message,
            status: 400 
        });
    }
    if(contacts.contacts.length == 0){
        const error = new Error('No hay contactos seleccionados');
        return res.status(402).json({
            msg: error.message,
            status: 402
        })
    }
    if(contacts.message == ''){
        const error = new Error('El mensaje es requerido');
        return res.status(400).json({
            msg: error.message,
            status: 400
        })
    }

    const contactsSend = [...contacts.contacts];

    wbm.start().then(async () => {
        let message = '';
        for(let contact of contactsSend){
            if(contacts.type == 'personalized'){
                message = `Hola ${contact.name}, ${contacts.message}`;
            }else if(contacts.type == 'general'){
                message = contacts.message;
            }
            await wbm.sendTo(contact.phone, message);
        }
    }).then(async () => {
        setTimeout(async () => {
            await wbm.end();
        }, 1000);
        res.status(200).json({
            status: 200,
            msg: 'Mensajes enviados correctamente'
        });
    }).catch(err => console.log(err));

}

export { sendMessage }