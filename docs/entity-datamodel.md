@startuml

class AuditableEntity {
  CreatedBy
  Created
  LastModifiedBy
  LastModified
}

abstract class BaseUser {
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
  Address1
  Address2
  CVRNumber
  Users
  DeactivationTime
}

class User {
  AccountId
}

enum Role {
  Admin
  Accountant
  User
}

class Address {
  StreetName
  StreetNumber
  PostCode
  City
  Country
}

BaseUser -|> AuditableEntity
User -|> BaseUser
Account -|> AuditableEntity
Account "1"-->"0..*" User
User "1"-->"1..2" Address

@enduml