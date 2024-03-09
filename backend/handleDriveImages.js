const fs = require('fs');
const { google } = require('googleapis');

const KEYFILEPATH = 'auth.json';

//define authorization
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: 'https://www.googleapis.com/auth/drive',
});

const drive = google.drive({ version: 'v3', auth });
const folderId = ['1vf2OJkrwuFni13KfOOR4o_ZdfehqLePF'];

//get file name curently used
function getFileName(data){
    return data.name + data.surname + data.imgNum + '.jpg';
}

//function to upload to google drive using service account
async function uploadToDrive(data){

    const fileName = getFileName(data)
    //selecting media type and converting to non 64 bit

    if(!data.img) return;

    //create convertable file
    const image = Buffer.from(data.img.split('base64,')[1], 'base64');

    //compressing image
    // LZString.compress(image);

    fs.writeFileSync(fileName, image);

    const media = {
        mimeType: 'image/jpeg', // Assuming the image data is in JPEG format
        body: fs.createReadStream(fileName),
        // Decode base64 data
    };

    console.log("file removed")
    
    //making sure that a duplicate doesnt exist so we delete from disk before
    await deleteFromDrive(data);
    console.log("after deleting file");
    
    //selecting correct name and folder
    const fileMetaData = {
        'name': fileName,
        'parents': folderId,
    };

    try {

        //creating image in the disk
        // console.log("before uploading", fileMetaData, media)
        const response = await drive.files.create({
            requestBody: fileMetaData,
            media: media,
            fields: 'id'
        });

        //making sure the fle data is correct
        console.log(`File '${fileName}' uploaded successfully with ID: ${response.data.id}`);
        fs.unlinkSync(fileName);
        return response.data.id;
    } catch (err) {
        console.error('Error uploading file:', err);
        return null;
    }
}


//function to delete images from the service account
async function deleteFromDrive(data){
    try {
        //get file id
        const fileId = await retrieveFileId(data);

        if(!fileId) return;

        //delete file from drive
        await drive.files.delete({
            fileId: fileId
        });
        console.log(`succesfully deleted image ${getFileName(data)}`)
    } catch (err) {
        console.error('Error deleting file:', err);
        throw err;
    }
}

// CURRENTLY NOT USED
// in the current version images are fetched with imageId
async function retrieveFromDrive(data){
    try {

        //get file id
        const fileId = await retrieveFileId(data);
        if(!fileId){
            return null;
        } 
        //retrieving response from drive
        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media'
        }, { responseType: 'stream' });

        const chunks = [];

        //returning data
        let buffer =  await new Promise((resolve, reject) => {
            response.data
                .on('data', chunk => chunks.push(chunk))
                .on('end', () => resolve(Buffer.concat(chunks)))
                .on('error', error => reject(error));
        });
        // buffer = Buffer.from(buffer);
        const base64 = 'data:image/jpeg;base64,'+Buffer.from(buffer).toString('base64')

        //decompressing image
        // LZString.decompress(base64);

        
        return base64;
    } catch (err) {
        console.error('Error downloading file:', err);
        throw err;
    }
}

//function to retrieve file by picture name
async function retrieveFileId(data){
    try {
        console.log("retrieving if");
        //get the file name
        const fileName = getFileName(data);

        //list of images with that name
        const response = await drive.files.list({
            q: `'${folderId}' in parents and name='${fileName}' and trashed=false`, // Query for files with the specified name and not trashed
            fields: 'files(id, name)' // Specify fields to retrieve only file ID and name
        });

        const files = response.data.files;

        //return the first image
        if (files.length > 0) {
            console.log(`File '${fileName}' found with ID: ${files[0].id}`);
            console.log('RETRIEVED FILES: ', files)
            return files[0].id;
        } else {
            console.log(`File '${fileName}' not found in Google Drive.`);
            return null;
        }
    } catch (err) {
        console.error('Error retrieving files:', err);
        return null;
    }
}

module.exports = {uploadToDrive, deleteFromDrive, retrieveFileId};