import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins cant be founded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // 1. create cabin
  // https://ohglkegoezfpbowoxbyb.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  let query = supabase.from("cabins");

  if (!id)
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("cabins can't be created or updated");
  }

  // 2. upload images
  // const avatarFile = event.target.files[0]
  if (!hasImagePath) {
    const { error: storageError } = await supabase
      .storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      // await supabase
      //   .from("cabins")
      //   .delete() // ✅ this deletes the row
      //   .eq("id", data.id);
      console.log(storageError);
      throw new Error("Cabin image could not be uploaded and cabin not created");
    }
  }

  return data;
}


export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete() // ✅ this deletes the row
    .eq("id", id); // ✅ condition to match the cabin

  if (error) {
    console.error(error);
    throw new Error("Cabin can't be deleted");
  }

  return data;
}
