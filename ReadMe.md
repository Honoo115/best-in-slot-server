# The Following contains pictures, link, and documentation of the API.


###### The Link to the live app can be found here! ==> (https://best-in-slot-manager-cap.now.sh/) 


### FRONT PAGE
<a href="https://ibb.co/kqqS3WF"><img src="https://i.ibb.co/tYYJZW5/BISM.png" alt="BISM" border="0"></a>


### CHARACTER PAGE
<a href="https://ibb.co/tLDcJcV"><img src="https://i.ibb.co/VwTDqDf/BISM.png" alt="BISM" border="0"></a>




GET /characters - Returns all the characters in the current database and displays them on screen.

POST /characters - Creates a new character along with an array of slots with null value names.

DELETE /character/:id - Deletes character with id and any slots created with the character.

GET /character/:id/slots/ - Displays all the slots designated for the created character.

POST /character/:id/slots/:slot_id generates all the slots for a character when a character is created.

PATCH /character/:id/slots/:slot_id - Patches original null value of slot_name with the value the user types in





##### All the code written to create this application was made in Microsoft Visual Studios

##### The Coding Languages used where Node for the server side and React for the Client Side. 
