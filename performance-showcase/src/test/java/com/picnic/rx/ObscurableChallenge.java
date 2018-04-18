package com.picnic.rx;

import io.reactivex.Flowable;
import org.junit.jupiter.api.Test;

public class ObscurableChallenge {

    @Test
    public void obscurable() {
        myObscurable(Flowable.just("Hello World"))
                .test()
                .assertValue("Hello World");
    }

    /**
     * Aim of the game: use the whackiest RxJava operators to create
     * an obscurable and to showcase your knowledge of the api whilst
     * satisfying the assertion in the test 🤪
     *
     * The winner will be decided by vote, post your solution to #sys-reactive
     *
     * For some inspiration to get you going, see {@link ObscurableChallenge#example(Flowable)}
     *
     * @param baseFlowable The base {@link Flowable} that emits "Hello World"
     * @return A {@link Flowable} that emits "Hello World"
     */
    private Flowable<String> myObscurable(Flowable<String> baseFlowable) {
        // TODO: Implement obscurable
        return baseFlowable;
    }

    @Test
    public void testExample() {
        example(Flowable.just("Hello World"))
                .test()
                .assertValue("Hello World");
    }

    private Flowable<String> example(Flowable<String> baseFlowable) {
        return baseFlowable
                .flatMap(s -> Flowable.fromArray(s.split(" ")))
                .buffer(2)
                .flatMap(Flowable::fromIterable)
                .scanWith(() -> "", (a, b) -> a.concat(" ").concat(b))
                .lastElement()
                .map(String::trim)
                .toFlowable();
    }
}
