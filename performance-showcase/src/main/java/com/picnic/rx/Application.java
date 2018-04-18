package com.picnic.rx;

import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;
import tech.picnic.rx.RxSpring4Util;

@SpringBootApplication
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/blocking")
    public Object blocking() {
        return someRxOp().blockingGet();
    }

    @GetMapping("/not-scheduled")
    public DeferredResult<String> noSched() {
        return someRxOp()
                .to(RxSpring4Util.singleToDeferredResult());
    }

    @GetMapping("/scheduled")
    public DeferredResult<String> scheduled() {
        return someRxOp()
                .subscribeOn(Schedulers.io())
                .to(RxSpring4Util.singleToDeferredResult());
    }

    @GetMapping("/bad-scheduling")
    public DeferredResult<String> badSched() {
        return someRxOp()
                .subscribeOn(Schedulers.computation())
                .to(RxSpring4Util.singleToDeferredResult());
    }

    private Single<String> someRxOp() {
        return Single.create(e -> {
            Thread.sleep(500);
            e.onSuccess("done");
        });
    }
}
