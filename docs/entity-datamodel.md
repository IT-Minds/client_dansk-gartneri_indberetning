@startuml

class AuditableEntity {
  CreatedBy
  Created
  LastModifiedBy
  LastModified
}

class Account {
  ID
  Name
  Tel
  UserIDs
}

class User {
  ID
  AccountID
  Email
  Password
  Role
  Name
  Address1
  Address2
  Tel
  CVRNumber
}

enum Role {
  ADMIN
  ACCOUNTANT
  USER
}

class Address {
  UserID
  StreetName
  StreetNumber
  PostCode
  City
  Country
}

User -|> AuditableEntity
Account -|> AuditableEntity
Account "1"-->"0..*" User
User "1"-->"1..2" Address

@enduml