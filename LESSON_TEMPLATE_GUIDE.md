# Friends of Children Ministries Template with Side Panel

This document shows the new lesson structure with side panel navigation.

## Page Structure Order

Each lesson page now follows this exact organization:

### 1. **Objectives & Overview** (Combined Section)
- Learning goals
- Lesson summary

### 2. **Lesson Content** (Main Teaching Material)
- Materials needed
- Step-by-step lesson outline
- Activities
- Teacher Notes

### 3. **Discussion Questions**
- Interactive questions for students

### 4. **Media Resources** (Videos & Audio)
- YouTube video embeds
- Audio files for songs, scripture readings, podcasts
- Blog articles

## Side Panel Navigation

A sticky side panel appears on the left showing quick links to:
- 🎯 Objectives & Overview
- 📖 Lesson Content
- 💬 Discussions
- 🎥 Media Resources

This allows teachers to quickly jump to any section while teaching.

## Implementation Notes

**For each lesson page (lesson1.html through lesson6.html):**

1. Wrap content in `.lesson-content-wrapper` grid:
   - Left: `.lesson-sidebar` (sticky)
   - Right: `.lesson-main-content`

2. Update sections in this order:
   ```html
   <div class="lesson-content-wrapper">
       <aside class="lesson-sidebar">
           <!-- Navigation Links -->
       </aside>
       
       <div class="lesson-main-content">
           <section id="objectives">...</section>
           <section id="lesson-content">...</section>
           <section id="discussions">...</section>
           <section id="media-resources">...</section>
       </div>
   </div>
   ```

3. Add `app.js` script at the end of the body for tab switching and scroll spy.

## Status

✅ CSS styles created (side panel, layout, justified text)
✅ `lesson-detail.html` updated as prototype
⚠️ Lesson HTML files need updating with new structure
