'use server';

import z from "zod";

export default async function handleLoginForm(previousState, formData) {

    const username = formData.get('username');
    const password = formData.get('password');

    const schema = z.object({
        username: z.string().min(2, {message: 'Your username is too short'}).max(50, {message: 'Your username is too long'}),
        password: z.string().min(1, {message: 'Your password is too short'}).max(50, {message: 'Your password is too long'})
    });

    const validated = schema.safeParse({
        username: username, 
        password: password
    });
    
    //console.log('validated', validated);

    if (!validated.success) return z.treeifyError(validated.error);

    // simulere at serveren er langsom til at svare, så vi kan se isPending styling/disabled button:
    //await new Promise((resolve) => setTimeout(() => resolve(), 3000));

    return validated;

}