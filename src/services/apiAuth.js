import supabase, { supabaseUrl } from "./supabase"

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      }
    }
  })
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession(); // fixed session extraction
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. update password or fullname
  let updateData = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updateData); // fixed update payload
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`; // fixed Math.random() call
  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //2. upload the avatar image
  //3. update the avatar in the user itself
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    }
  }); // fixed missing await and variable naming
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
