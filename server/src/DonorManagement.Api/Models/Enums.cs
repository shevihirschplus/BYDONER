namespace DonorManagement.Api.Models.Enums;

public enum FamilyStatus
{
    Single,
    Married,
    Divorced,
    Widowed
}

public enum PaymentMethod
{
    Cash,
    CreditCard,
    BankTransfer,
    Check,
    NedarimPlus,
    Achisamach,
    Other
}

public enum Currency
{
    USD,
    NIS,
    GBP
}

public enum EventType
{
    Birthday,
    Yahrzeit,
    Wedding,
    BarMitzva,
    Dinner,
    Visit,
    FollowUp
}

public enum DonationType
{
    OneTime,
    Annual
}
