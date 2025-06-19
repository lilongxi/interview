import { ref, onMounted, onUnmounted, reactive, toRefs } from "vue";

function useMousePosition() {

    const x = ref(0)
    const y = ref(0)

    // const state = reactive({ x: 0, y: 0 })

    function update(e) {
        x.value = e.pageX
        y.value = e.pageY

        // state.x = e.pageX
        // state.y = e.pageY
    }
    
    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    // return {
    //     ...toRefs(state)
    // }

    return {
        x,
        y
    }

}