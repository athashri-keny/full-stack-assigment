
export function Checkadmin(req: Request) {
const adminKey = req.headers.get("x-admin-key")

if (adminKey !== process.env.ADMIN_KEY) {
    return new Response(
        JSON.stringify({error: "UnAuthorized! Invaild aadmin key"}),
        {
            status: 401,
            headers: {"Content-Type": 'application/json'}
        }
    )
}
return null;
}