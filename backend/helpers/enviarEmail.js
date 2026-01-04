import { Resend } from 'resend';
const enviarEmail = async (data) => {
    const resend = new Resend(process.env.RESEND_TOKEN);
    const {nombre, email, token} = data;

    try {
        const { data } = await resend.emails.send({
            from: "InventSystems <onboarding@resend.dev>",
            to: email,
            subject: "Confirma tu cuenta",
            html: `
                <p>Hola ${nombre}, para confirmar tu cuenta digite el siguiente código: ${token}</p>
            `,
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export default enviarEmail;