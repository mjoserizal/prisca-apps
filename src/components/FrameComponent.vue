<template>
  <section
    :style="{ alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '0px 0px 55px', boxSizing: 'border-box', maxWidth: '100%', textAlign: 'center', fontSize: '30px', color: '#252525', fontFamily: 'Poppins' }">
    <div
      :style="{ flex: '1', backgroundColor: '#e8f4fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '94px 10%', boxSizing: 'border-box', gap: '30px', maxWidth: '100%', zIndex: '1' }">
      <div
        :style="{ width: '100%', height: 'auto', position: 'relative', backgroundColor: '#e8f4fa', display: 'none', maxWidth: '100%' }" />
      <img :style="{ width: '54px', height: '54px', position: 'relative', objectFit: 'contain', zIndex: '2' }"
        loading="lazy" alt="" src="/images/Pai Chart 1.png" />
      <div
        :style="{ width: '100%', maxWidth: '654px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '0px 36px', boxSizing: 'border-box', maxWidth: '100%' }">

        <div
          :style="{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }">

          <div
            :style="{ alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }">
            <h2
              :style="{ margin: '0', width: '100%', maxWidth: '516px', position: 'relative', fontSize: 'inherit', lineHeight: '170%', fontWeight: '600', fontFamily: 'inherit', display: 'inline-block', flexShrink: '0', maxWidth: '100%', zIndex: '2' }">
              Subscribe for more information.
            </h2>
          </div>
        </div>
      </div>
      <div
        :style="{ alignSelf: 'stretch', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px', maxWidth: '100%' }">
        <input
          :style="{ width: '100%', border: 'none', outline: 'none', backgroundColor: '#fff', height: '67px', flex: '1', boxShadow: '0px 4px 84px rgba(0, 0, 0, 0.07)', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '20px 36px', boxSizing: 'border-box', fontFamily: 'Poppins', fontSize: '16px', color: '#787878', minWidth: '300px', maxWidth: '100%', zIndex: '2' }"
          placeholder="Enter your email" type="text" />
        <button
          :style="{ cursor: 'pointer', border: 'none', padding: '20px 43px', backgroundColor: '#000', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', zIndex: '2' }">
          <div
            :style="{ height: '67px', width: '173px', position: 'relative', borderRadius: '10px', backgroundColor: '#000', display: 'none' }" />
          <div
            :style="{ position: 'relative', fontSize: '16px', lineHeight: '170%', fontWeight: '500', fontFamily: 'Poppins', color: '#fff4f4', textAlign: 'center', display: 'inline-block', minWidth: '86px', zIndex: '1' }">
            SUBSCRIBE
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FrameComponent",
});
</script>
