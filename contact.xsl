<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <div class="promo-container">
            <h2 class="promo-title">Небольшое промо</h2>
            <div class="user-info">
                <p><strong>Полное имя:</strong> <xsl:value-of select="student/fullname"/></p>
                <p><strong>Факультет:</strong> <xsl:value-of select="student/faculty"/></p>
                <p><strong>Курс:</strong> <xsl:value-of select="student/course"/></p>
                <p><strong>Группа:</strong> <xsl:value-of select="student/group"/></p>
                <p><strong>Телефон:</strong> <xsl:value-of select="student/phone"/></p>
                <p><strong>Email:</strong> <xsl:value-of select="student/email"/></p>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet> 
