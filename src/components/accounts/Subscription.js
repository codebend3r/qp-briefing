import { useEffect, useState } from "react"

import Image from "next/image"

import { capitalizeFirstLetter } from "@lib/utils"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

export const Subscription = ({ data, session }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [editUserId, setEditUserId] = useState(null)
  const [userList, setUserList] = useState(data.users)

  useEffect(() => {
    if (session) {
      const currentUser = data.users.find((user) => {
        return user.user.email === session.user.email
      })

      if (currentUser.role === "admin" || currentUser.user.role === "admin") {
        setIsAdmin(true)
      }

      if (currentUser.role === "owner") {
        setIsOwner(true)
      }
    }
  }, [session, data.users])

  const handleAddUser = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    const role = formData.get("role")

    const status = await fetch(`/api/subscriptions/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        role,
      }),
    })
    if (status.ok) {
      const newUser = await status.json()
      const newUserList = [{ ...newUser, user: { email, id: newUser.userId } }, ...userList]
      setUserList(newUserList)
    } else {
      const error = await status.json()
      setErrorMessage(error.message)
    }
  }

  const handleRemoveUser = async ({ uid, subscriptionId }) => {
    const status = await fetch(`/api/subscriptions/${subscriptionId}/user/${uid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (status.ok) {
      const newUserList = userList.filter((user) => user.user.id !== uid)
      setUserList(newUserList)
    } else {
      // noop
    }
  }

  const handleChangeRole = async ({ uid, subscriptionId, role }) => {
    const status = await fetch(`/api/subscriptions/${subscriptionId}/user/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    })
    if (status.ok) {
      const newUserList = userList.map((user) => {
        if (user.user.id === uid) {
          return { ...user, role }
        }
        return user
      })
      setUserList(newUserList)
      setEditUserId(null)
    } else {
      // no-op
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{data.name}</h2>
          <div className="status">Status: {capitalizeFirstLetter(data.status)}</div>
          <div className="licenses">
            {data?.users?.length} of {data.quantity} licenses in use
          </div>
          <div className="status-bar">
            <div className="status-bar--bar"></div>
          </div>
          {(isAdmin || isOwner) && data.users.length < data.quantity && (
            <div className="add-user">
              <h3>Add a user</h3>
              <form onSubmit={(e) => handleAddUser(e)}>
                <input type="email" placeholder="Email" name="email" />
                <select name="role">
                  <option value="user">Reader</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="button">
                  Add user
                </button>
              </form>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          )}
          <div className="users">
            <h3>Users</h3>
            <ul>
              {userList.map((user) => (
                <li key={user.userId} id={user.userId}>
                  <div className="user">
                    <div className="details">
                      <div className="email">{user.user.email}</div>
                      <div className="role">{user.role === "user" ? "Reader" : capitalizeFirstLetter(user.role)}</div>
                    </div>

                    {(isAdmin || isOwner) && editUserId === user.userId && (
                      <div className="edit">
                        {user.role === "user" ? (
                          <button
                            className="button"
                            onClick={() =>
                              handleChangeRole({
                                uid: user.userId,
                                subscriptionId: data.id,
                                role: "admin",
                              })
                            }
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            className="button"
                            onClick={() =>
                              handleChangeRole({
                                uid: user.userId,
                                subscriptionId: data.id,
                                role: "user",
                              })
                            }
                          >
                            Remove Admin
                          </button>
                        )}
                        <button
                          className="button button-red"
                          onClick={() =>
                            handleRemoveUser({
                              uid: user.userId,
                              subscriptionId: data.id,
                            })
                          }
                        >
                          Delete User
                        </button>
                      </div>
                    )}

                    {(isAdmin || isOwner) && user.role !== "owner" && (
                      <div className="edit-button">
                        <Image
                          src="/edit.svg"
                          onClick={() => setEditUserId(editUserId === user.userId ? null : user.userId)}
                          width={20}
                          height={20}
                          alt="Edit"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          margin: 0 auto;
          max-width: 1140px;
          background-color: ${colors.slate[100]};
          padding: ${theme.spacing.lg};
          border-top: 4px solid ${colors.sky[500]};
          border-radius: ${theme.borderRadius.sm};
          box-shadow: ${theme.shadow.card};
          margin-bottom: ${theme.spacing.lg};
        }
        h2 {
          margin-top: 0;
          color: ${colors.blue[900]};
          font-size: 1.5rem;
          font-weight: 800;
        }
        h3 {
          color: ${colors.blue[900]};
        }
        .status {
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          border-radius: 20px;
          color: #fff;
          font-weight: 600;
          line-height: 1;
          display: inline-block;
          background-color: ${data.status === "active" ? colors.sky[500] : "#f00"};
          margin-bottom: ${theme.spacing.sm};
        }
        .licenses {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: ${colors.grey[600]};
        }
        .status-bar {
          height: 10px;
          background-color: #fff;
          margin-top: 0.5rem;
          border-radius: 2rem;
          overflow: hidden;
        }
        .status-bar--bar {
          height: 100%;
          width: ${(data?.users?.length / data.quantity) * 100}%;
          background-color: ${colors.sky[500]};
        }
        .add-user {
          margin-top: 1rem;
        }
        .add-user form {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: ${theme.spacing.sm};
        }
        .users {
          margin-top: 1rem;
        }
        .users ul {
          list-style: none;
          padding: 0;
        }
        .users li {
          margin-top: ${theme.spacing.sm};
        }
        .users li .user {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          padding: ${theme.spacing.sm} ${theme.spacing.sm};
          border-radius: ${theme.borderRadius.sm};
          border-bottom: 2px solid ${colors.sky[500]};
          transition: all 0.2s ease-in-out;
        }

        .users li .user .details {
          display: flex;
          flex-direction: column;
        }
        .users li .user .email {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .users li .user .role {
          color: ${colors.grey[500]};
        }

        .edit {
          display: grid;
          grid-template-columns: 1fr 1fr 30px;
          grid-gap: ${theme.spacing.sm};
          margin-left: auto;
        }

        .edit-button {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        @media screen and (max-width: 800px) {
          .card {
            padding: ${theme.spacing.md};
          }
          .edit {
            grid-template-columns: 1fr;
            margin: 0 auto;
          }
          .edit-button {
            position: absolute;
            top: ${theme.spacing.sm};
            right: ${theme.spacing.sm};
          }
          .users li .user {
            position: relative;
          }
        }
        @media screen and (max-width: 600px) {
          .card {
            padding: ${theme.spacing.md} ${theme.spacing.sm};
          }
          .add-user form {
            grid-template-columns: 1fr 1fr;
          }
          .add-user form button {
            grid-column: 1 / -1;
          }
          .users li .user .email {
            line-break: anywhere;
          }
        }

        @media screen and (max-width: 500px) {
          .users li .user {
            flex-direction: column;
            align-items: flex-start;
            position: relative;
          }

          .users li .user .email {
            margin-bottom: 0;
            margin-right: ${theme.spacing.sm};
          }
          .users li .user .role {
            margin-bottom: ${theme.spacing.sm};
          }

          .edit {
            grid-template-columns: 1fr;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media screen and (max-width: 400px) {
          .card {
            padding: ${theme.spacing.sm} ${theme.spacing.xs};
            margin: 0 ${theme.spacing.xs};
          }
          .add-user form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
