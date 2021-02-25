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
  Users
  DeactivationTime
}

class User {
  AccountId
  Address1
  Address2
  Tel
  CVRNumber
}

enum Role {
  Admin
  Accountant
  Customer
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