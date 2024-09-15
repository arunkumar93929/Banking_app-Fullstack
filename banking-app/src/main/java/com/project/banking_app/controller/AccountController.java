package com.project.banking_app.controller;

import com.project.banking_app.dto.AccountDto;
import com.project.banking_app.service.AccountService;
import org.springframework.aot.generate.Generated;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }
    //Add account restapi
    @PostMapping
    public ResponseEntity<AccountDto> addAccount(@RequestBody  AccountDto accountDto){
        return  new ResponseEntity<>(accountService.createAccount(accountDto), HttpStatus.CREATED);
    }
    //get account rest api
    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountByid(@PathVariable Long id){
        AccountDto accountDto= accountService.getAccountById(id);
        return ResponseEntity.ok(accountDto);
    }
    //deposit rest api
    @PutMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@PathVariable Long id,@RequestBody Map<String, Double> request){
        Double amount=request.get("amount");

        AccountDto accountDto= accountService.deposit(id,amount);
        return ResponseEntity.ok(accountDto);
    }
    //with draw rest api
    @PutMapping("/{id}/withdraw")
    public  ResponseEntity<AccountDto > withDraw(@PathVariable Long id,@RequestBody Map<String , Double>request){
        double amount=request.get("amount");
        AccountDto accountDto = accountService.withDraw(id , amount);
        return ResponseEntity.ok(accountDto);
    }
    //Get all account rest api
    @GetMapping
    public  ResponseEntity<List<AccountDto>> getAllAccounts(){
        List<AccountDto> accounts=accountService.getAllAccounts();
        return  ResponseEntity.ok(accounts);
    }
    //Delete account rest api
    @DeleteMapping("/{id}")
    public  ResponseEntity<String> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return  ResponseEntity.ok("account is Deleted succesfull");
    }

}
