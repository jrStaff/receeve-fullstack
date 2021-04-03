# How to create .zip for deployment!

```
npm install --also=dev
```

#### Fill in the secrets/user to deploy to AWS Lambda below
```
serverless config credentials --provider aws --key CLIENTID --secret SECRET
```


#### (IMPORTANT) Fill in src/config/production with ARN's to target a topic and dynamoDB table 
####  Provide the webhookSigningKey for authenticating Mailgun Events


### Then
```
serverless deploy
```


# Design Pattern
Because the demand was loose coupling to the input and output mechanisms I decided this pattern would be best fit for the requirements. The strange part is that the business domain logic is quite non-existant. There are no business actions other than converting data, which is only arguably a domain transaction.

https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)
