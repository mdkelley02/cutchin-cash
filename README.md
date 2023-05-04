## Redis Access Patterns

* lookup transaction by transactionId
* transactionId:`<transactionId>`:transaction -> TransactionModel.toJson()
* Lookup transactionIds by userId
* userId:`<userId>`:transactionIds -> Set of transactionIds
* Lookup userId by userId
* userId:`<userId>`:userProfile -> UserModel.toJson()
* Lookup user profile entry key by email
* email:`<email>`:userId -> userId:`<userId>`:userProfile
* Lookup all users
* userIds -> Set of userIds

https://cdn.dribbble.com/userupload/6073936/file/original-a06fcadf16954921ab0006bb136244dc.jpg?compress=1&resize=1600x1200


Run current downstream with npm run ios 