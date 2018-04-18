package com.picnic.rx;

import io.reactivex.Flowable;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;

public class ObscurableChallenge {

    @Test
    public void obscurable() {
        Flowable.fromPublisher(myObscurable(Flowable.just("Hello World")))
                .test()
                .assertValue("Hello World");
    }

    /**
     * Aim of the game: use the whackiest RxJava or Reactor operators to create
     * an obscurable and to showcase your knowledge of the api whilst
     * satisfying the assertion in the test 🤪
     *
     * RxJava ({@link Flowable}) or Reactor ({@link Flux}) choose your poison
     *
     * The winner will be decided by vote, post your solution to #sys-reactive
     *
     * For some inspiration to get you going see {@link ObscurableChallenge#example(Publisher)}
     *
     * @param baseFlowable The base {@link Flowable} that emits "Hello World"
     * @return A {@link Flowable} that emits "Hello World"
     */
    private Publisher<String> myObscurable(Publisher<String> baseFlowable) {
        // TODO: Implement obscurable
        return Flowable.fromPublisher(baseFlowable);
    }


    /**
     * Some examples
     */
    @Test
    public void testExample() {
        Flowable.fromPublisher(example(Flowable.just("Hello World")))
                .test()
                .assertValue("Hello World");

        Flowable.fromPublisher(exampleReactor(Flux.just("Hello World")))
                .test()
                .assertValue("Hello World");
    }

    private Publisher<String> example(Publisher<String> baseFlowable) {
        return Flowable.fromPublisher(baseFlowable)
                .flatMap(s -> Flowable.fromArray(s.split(" ")))
                .buffer(2)
                .flatMap(Flowable::fromIterable)
                .scanWith(() -> "", (a, b) -> a.concat(" ").concat(b))
                .lastElement()
                .map(String::trim)
                .toFlowable();
    }

    private Publisher<String> exampleReactor(Publisher<String> base) {
        return Flux.from(base)
                .flatMap(s -> Flowable.fromArray(s.split(" ")))
                .buffer(2)
                .flatMap(Flowable::fromIterable)
                .scanWith(() -> "", (a, b) -> a.concat(" ").concat(b))
                .last()
                .map(String::trim)
                .flux();
    }
}
