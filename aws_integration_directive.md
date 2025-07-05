# AWS integration

## Core

- This is the file that will guide you to integrate AWS in this project

## S3

- Every recording will be stored in S3
- There are two sources, one is the recording itself stored in AWS S3, the other is the data related to that specific recording, stored in the db.
- Both sources are connected in the db. I mean, the recording has a reference to the S3 object.
- When we delete a recording, we need to delete the S3 object as well.
- When we create a recording, first we store the recording in S3 and then (if the transaction is successfull) we store the data in the db.
- A recording has a defined model.
- This behavior and connection with S3 is followed by every method in the controller (CRUD)
- The only role that can perform this actions is the admin. Users can only get the recordings.
