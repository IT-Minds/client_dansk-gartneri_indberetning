@startuml

class AuditableEntity {
  CreatedBy
  Created
  LastModifiedBy
  LastModified
}

<<<<<<< HEAD
class Account {
  Id
  Name
  Tel
  Users
  DeactivationTime
}

class User {
  Id
  AccountId
  Email
  Password
  Role
  Name
  Address1
  Address2
  Tel
  CVRNumber
  DeactivationTime
}

=======
interface IUser {
  Id
  Email
  Password
  Role
  Name
  DeactivationTime
}

class Account {
  Id
  Name
  Tel
  Email
  Address
  CVRNumber
  Users
  DeactivationTime
}

class User {
  AccountId
}

>>>>>>> main
enum Role {
  Admin
  Accountant
  User
}

class Address {
<<<<<<< HEAD
  UserId
=======
>>>>>>> main
  StreetName
  StreetNumber
  PostCode
  City
  Country
}

<<<<<<< HEAD
=======
User -|> IUser
>>>>>>> main
User -|> AuditableEntity
Account -|> AuditableEntity
Account "1"-->"0..*" User
User "1"-->"1..2" Address

@enduml