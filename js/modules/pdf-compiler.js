/**
 * PDF Compiler Module
 * Handles Bible study PDF generation and compilation
 * Requirements: 1.2, 1.4, 1.5
 */

class PDFCompiler {
    constructor() {
        this.isLibraryLoaded = false;
        this.loadLibrary();
    }

    /**
     * Load html2pdf.js library dynamically
     */
    async loadLibrary() {
        if (typeof html2pdf === 'undefined') {
            try {
                // Load html2pdf.js from CDN
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = () => {
                    this.isLibraryLoaded = true;
                    console.log('PDF library loaded successfully');
                };
                script.onerror = () => {
                    console.error('Failed to load PDF library');
                };
                document.head.appendChild(script);
            } catch (error) {
                console.error('Error loading PDF library:', error);
            }
        } else {
            this.isLibraryLoaded = true;
        }
    }

    /**
     * Generate weekly summary of Bible study materials
     * @param {Object} studyData - Bible study data
     * @returns {Object} Weekly summary data
     */
    generateWeeklySummary(studyData) {
        const currentDate = new Date();
        const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return {
            weekRange: `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`,
            title: studyData.title || 'Weekly Bible Study',
            scripture: studyData.scripture || '',
            summary: studyData.summary || '',
            lessons: studyData.lessons || [],
            generatedDate: new Date().toLocaleDateString()
        };
    }

    /**
     * Compile lesson content to PDF
     * @param {Object} lessonContent - Lesson content data
     * @returns {Promise<Blob>} PDF blob
     */
    async compileLessonToPDF(lessonContent) {
        if (!this.isLibraryLoaded) {
            throw new Error('PDF library not loaded');
        }

        const formattedContent = this.formatContent(lessonContent);
        
        const options = {
            margin: 1,
            filename: `${lessonContent.title || 'bible-study'}-${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            const pdfBlob = await html2pdf().set(options).from(formattedContent).outputPdf('blob');
            return pdfBlob;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }

    /**
     * Download PDF file
     * @param {Blob} pdfBlob - PDF blob data
     * @param {string} filename - Filename for download
     */
    downloadPDF(pdfBlob, filename) {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Format content for PDF generation
     * @param {Object} rawContent - Raw content data
     * @returns {HTMLElement} Formatted HTML element
     */
    formatContent(rawContent) {
        const container = document.createElement('div');
        container.style.cssText = `
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            border-bottom: 2px solid #4a6d8c;
            padding-bottom: 20px;
            margin-bottom: 30px;
        `;
        header.innerHTML = `
            <h1 style="color: #4a6d8c; margin: 0 0 10px 0; font-size: 24px;">${rawContent.title || 'Bible Study'}</h1>
            <p style="margin: 0; font-size: 16px; color: #666;">${rawContent.scripture || ''}</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #888;">Generated on ${new Date().toLocaleDateString()}</p>
        `;

        // Content sections
        const content = document.createElement('div');
        
        if (rawContent.objectives && rawContent.objectives.length > 0) {
            content.innerHTML += `
                <div style="margin-bottom: 25px;">
                    <h2 style="color: #4a6d8c; font-size: 18px; margin-bottom: 10px;">Objectives</h2>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${rawContent.objectives.map(obj => `<li style="margin-bottom: 5px;">${obj}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (rawContent.lessonContent) {
            content.innerHTML += `
                <div style="margin-bottom: 25px;">
                    <h2 style="color: #4a6d8c; font-size: 18px; margin-bottom: 10px;">Lesson Content</h2>
                    <div style="line-height: 1.8;">${rawContent.lessonContent}</div>
                </div>
            `;
        }

        if (rawContent.discussionQuestions && rawContent.discussionQuestions.length > 0) {
            content.innerHTML += `
                <div style="margin-bottom: 25px;">
                    <h2 style="color: #4a6d8c; font-size: 18px; margin-bottom: 10px;">Discussion Questions</h2>
                    <ol style="margin: 0; padding-left: 20px;">
                        ${rawContent.discussionQuestions.map(q => `<li style="margin-bottom: 10px;">${q}</li>`).join('')}
                    </ol>
                </div>
            `;
        }

        if (rawContent.keyPoints && rawContent.keyPoints.length > 0) {
            content.innerHTML += `
                <div style="margin-bottom: 25px;">
                    <h2 style="color: #4a6d8c; font-size: 18px; margin-bottom: 10px;">Key Teaching Points</h2>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${rawContent.keyPoints.map(point => `<li style="margin-bottom: 8px;">${point}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Footer
        const footer = document.createElement('div');
        footer.style.cssText = `
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 20px;
            margin-top: 40px;
            font-size: 12px;
            color: #888;
        `;
        footer.innerHTML = `
            <p style="margin: 0;">Friends of Children Ministries</p>
            <p style="margin: 5px 0 0 0;">Empowering teachers to inspire the next generation</p>
        `;

        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);

        return container;
    }
}

// Export for use in other modules
window.PDFCompiler = PDFCompiler;