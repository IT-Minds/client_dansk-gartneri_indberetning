@startuml

class AuditableEntity {
  CreatedBy
  Created
  LastModifiedBy
  LastModified
}

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

enum Role {
  Admin
  Accountant
  User
}

class Address {
  UserId
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