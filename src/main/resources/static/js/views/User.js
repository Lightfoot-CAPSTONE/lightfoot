import createView from "../createView.js";

const BASE_URL = "http://localhost:8080/api/users"

export default function UserIndex(props) {
    //language=HTML
    return `
        <header>
            <h1>Welcome, ${props.user.username}</h1>
        </header>
        <main>
            <form id="user-info-form">
                <label for="email">Email</label>
                <input disabled id="email" name="email" type="email" value="${props.user.email}">
                <!--                <label for="old-password">Old Password</label>-->
                <!--                <input disabled id="old-password" name="old-password" type="password" value="this is not your real password"/>-->
                <label for="new-password">New Password</label>
                <input id="new-password" name="new-password" type="password" value="this is not your real password"/>
                <button id="change-password-button" data-id="${props.user.id}" type="submit">Change Password</button>
            </form>
        </main>
    `
}

export function UserEvent() {
    addUpdatePasswordListener();
}

function addUpdatePasswordListener() {
    $(document).on('click', '#change-password-button', function (e) {
        e.preventDefault();
        const id = $(this).data("id");
        const newPassword = $("#new-password").val();

        const request = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${BASE_URL}/${id}/updatePassword?newPassword=${newPassword}`, request)
            .then(res => {
                console.log(res.status);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                createView("/user")
            })
    })
}