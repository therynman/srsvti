// src/types/sheryjs.d.ts

declare module "sheryjs" {
    interface ConfigValue {
        value: number;
        range?: [number, number];
    }

    interface ImageEffectConfig {
        a?: ConfigValue;
        b?: ConfigValue;
        z?: ConfigValue;
        aspect?: { value: number };
        gooey?: { value: boolean };
        infiniteGooey?: { value: boolean };
        speed?: ConfigValue;
        infiniteSpeed?: { value: boolean };
        dissipationRate?: ConfigValue;
        easing?: string;
        // Add other config options as needed
    }

    interface ImageEffectOptions {
        style: number;
        config?: ImageEffectConfig;
        slideStyle?: number;
    }

    interface MouseFollowerOptions {
        skew?: boolean;
        ease?: number;
        duration?: number;
    }

    interface MagnetOptions {
        ease?: number;
        duration?: number;
        distance?: number;
    }

    interface TextAnimationOptions {
        style: number;
        y?: number;
        delay?: number;
        duration?: number;
        ease?: string;
    }

    // Define the SheryInstance interface
    interface SheryInstance {
        imageEffect(
            selector: string | HTMLElement,
            options: ImageEffectOptions
        ): void;
        mouseFollower(options?: MouseFollowerOptions): void;
        makeMagnet(
            selector: string | HTMLElement,
            options?: MagnetOptions
        ): void;
        textAnimate(
            selector: string | HTMLElement,
            options?: TextAnimationOptions
        ): void;

        // Since removeEffect isn't actually in SheryJS, we need another approach
        // We'll update the component code instead of adding this non-existent method
    }

    const Shery: SheryInstance;
    export default Shery;
}
