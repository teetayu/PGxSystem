import React, { useState } from 'react'
import '../styles/userpage.css'
import Sidebar from '../components/Sidebar'

export default function Order() {
  const [activeTab, setActiveTab] = useState('snp')

  const snpTests = [
    'Genomic DNA Extraction',
    'PGx for UGT1A1',
    'PGx for DPYD',
    'PGx for DPYD (7 SNPs)',
    'PGx for TPMT',
    'TPMT activity',
    'TPMT + TPMT activity',
    'PGx for NUDT15',
    'Thiopurines profile',
    'ITPA genotyping',
    'PGx for CYP1A2',
    'PGx for CYP2A6',
    'PGx for CYP2B6',
    'PGx for CYP2C19',
    'PGx for CYP2C9',
    'PGx for CYP2D6',
    'PGx for CYP3A4',
    'PGx for CYP3A5',
    'Pyrosequencing for SNP',
    'PGx for ApoE',
    'PGx for NAT2',
    'MTHFR genotyping',
    'PGx for Statins',
    'RYR1 & CACNA1S genotyping',
    'PGx for Cardiovascular drugs',
    'PGx for Oncology panel'
  ]

  const hlaTests = [
    'PGx for HLA-B*13:01 สนิม',
    'PGx for HLA-B*15:02 สนิม',
    'PGx for HLA-B*57:01 สนิม',
    'PGx for HLA-B*58:01 สนิม',
    'PGx for HLA-B*35:05 สนิม',
    'HLA-B for Dapsone (HLA-B*13:01)',
    'PGx for Carbamazepine (HLA-B*15:02)',
    'HLA-A for Carbamazepine (HLA-A*31:01)',
    'Carbamazepine Profile',
    'PGx for Abacavir (HLA-B*57:01)',
    'PGx for Allopurinol (HLA-B*58:01)',
    'PGx for Nevirapine (HLA-B*35:05)',
    'PGx for HLA-B (PCR-SSO)'
  ]

  const functionalTests = [
    'Busulfan Personalized Medicine',
    'Therapeutic drug monitoring (Functional)',
    'Tamoxifen (Functional)',
    'Fludarabine (Functional)',
    'Cyclophosphamide (Functional)',
    '6-MP Metabolites',
    'Nifedipine (Functional)'
  ]

  const drugToxicityTests = [
    'PGx for Acetaminophen (CYP2D6)',
    'PGx for Amitriptyline (CYP2D6)',
    'PGx for Aripiprazole (CYP2D6)',
    'PGx for Atomoxetine (CYP2D6)',
    'PGx for Azathioprine (TPMT)',
    'PGx for Carvedilol (CYP2D6)',
    'PGx for Citalopram (CYP2D6)',
    'PGx for Clomipramine (CYP2D6)',
    'PGx for Clopidogrel (CYP2C19)',
    'PGx for Clozapine (CYP2D6)',
    'PGx for Desloratadine (CYP2D6)',
    'PGx for Dextromethorphan (CYP2D6)',
    'PGx for Efavirenz (All in one assay)',
    'PGx for Fluoxetine (CYP2D6)',
    'PGx for Galantamine (CYP2D6)',
    'PGx for Gefitinib (CYP2D6)',
    'PGx for Imipramine (CYP2D6)',
    'PGx for Irinotecan (UGT1A1)',
    'PGx for Mercaptopurine (TPMT)',
    'PGx for Metoprolol (CYP2D6)',
    'PGx for Nortriptyline (CYP2D6)',
    'PGx for Olanzapine (CYP2D6)',
    'PGx for Paroxetine (CYP2D6)',
    'PGx for Perphenazine (CYP2D6)',
    'PGx for Pimozide (CYP2D6)',
    'PGx for Propafenone (CYP2D6)',
    'PGx for Propranolol (CYP2D6)',
    'PGx for Protriptyline (CYP2D6)',
    'PGx for Risperidone (CYP2D6)',
    'PGx for Terbinafine (CYP2D6)',
    'PGx for Tetrabenazine (CYP2D6)',
    'PGx for Thioridazine (CYP2D6)',
    'PGx for Timolol (CYP2D6)',
    'PGx for Tolterodine (CYP2D6)',
    'PGx for Trimipramine (CYP2D6)',
    'PGx for Thioguanine (TPMT)'
  ]

  // helper to split an array into n balanced columns
  function chunkArray(arr, n) {
    const out = Array.from({ length: n }, () => [])
    arr.forEach((item, idx) => {
      out[idx % n].push(item)
    })
    return out
  }
  return (
    <div className="page-patient">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <p>สั่งตรวจ</p>
          <div className="box-right">
            <div className="divider" />
            <div className="icon-link user-img" />
            <button className="New-Patients">ชื่อผู้ใช้งาน</button>
          </div>
        </header>

        <section className="patient-box">
          <div className="order-patient">
            <div className="patient">
              <div className="form-title">ข้อมูลผู้ป่วย</div>
              <div id="patient-info" className="patient-info">
                <p><strong>ชื่อ-นามสกุล (Name):</strong> <span id="patient-name">—</span></p>
                <p><strong>เลขประจำตัว (HN):</strong> <span id="patient-hn">—</span></p>
                <p><strong>แพทย์ (Physician):</strong> <span id="patient-doctor">—</span></p>
              </div>
            </div>

            <div className="row-container">
              <div className="row1">
                <div className="form-field1">
                  <div className="form-label">เหตุผลที่สั่งตรวจ :</div>
                  <div className="input"><input className="input1" type="text" placeholder="ระบุเหตุผลการสั่งตรวจ" /></div>
                </div>

                <div className="column">
                  <div className="form-field2">
                    <div className="form-label">ยาที่ผู้ป่วยได้รับในปัจจุบัน</div>
                    <div className="input"><input className="input2" type="text" placeholder="ระบุยาที่ผู้ป่วยได้รับ" /></div>
                  </div>
                  <div className="form-field2">
                    <div className="form-label">โปรดระบุชนิดของยาที่จะใช้ในการรักษา :</div>
                    <div className="input"><input className="input3" type="text" placeholder="ระบุยาที่จะใช้ในการรักษา" /></div>
                  </div>
                </div>

                <div className="check-page">
                  <div className="sel-title">เลือกรายการตรวจวินิจฉัย :</div>
                  <div className="check-box">
                    <div className="test-tabs">
                      <button onClick={() => setActiveTab('snp')} className={`tab-btn ${activeTab === 'snp' ? 'active' : ''}`}>SNP genotyping test</button>
                      <button onClick={() => setActiveTab('hla')} className={`tab-btn ${activeTab === 'hla' ? 'active' : ''}`}>HLA/Drug-related SCAR screening test</button>
                      <button onClick={() => setActiveTab('func')} className={`tab-btn ${activeTab === 'func' ? 'active' : ''}`}>Functional genomics test</button>
                      <button onClick={() => setActiveTab('drug')} className={`tab-btn ${activeTab === 'drug' ? 'active' : ''}`}>Drug/Gene-related toxicity test</button>
                    </div>
                    <hr />
                    <div className="check-grid">
                      {/** Render two balanced columns when tab is SNP or HLA **/}
                      {activeTab === 'snp' && (
                        chunkArray(snpTests, 2).map((col, ci) => (
                          <div className="checklist" key={ci}>
                            <div className="tab-panel" style={{ display: 'block' }}>
                              {col.map((t) => (
                                <label className="chk" key={t}><input type="checkbox" /> {t}</label>
                              ))}
                            </div>
                          </div>
                        ))
                      )}

                      {activeTab === 'hla' && (
                        chunkArray(hlaTests, 2).map((col, ci) => (
                          <div className="checklist" key={ci}>
                            <div className="tab-panel" style={{ display: 'block' }}>
                              {col.map((t) => (
                                <label className="chk" key={t}><input type="checkbox" /> {t}</label>
                              ))}
                            </div>
                          </div>
                        ))
                      )}

                      {activeTab === 'func' && (
                        chunkArray(functionalTests, 2).map((col, ci) => (
                          <div className="checklist" key={ci}>
                            <div className="tab-panel" style={{ display: 'block' }}>
                              {col.map((t) => (
                                <label className="chk" key={t}><input type="checkbox" /> {t}</label>
                              ))}
                            </div>
                          </div>
                        ))
                      )}

                      {activeTab === 'drug' && (() => {
                        // choose number of columns dynamically based on list length
                        const cols = Math.min(3, Math.ceil(drugToxicityTests.length / 12))
                        return chunkArray(drugToxicityTests, cols).map((col, ci) => (
                          <div className="checklist" key={ci}>
                            <div className="tab-panel" style={{ display: 'block' }}>
                              {col.map((t) => (
                                <label className="chk" key={t}><input type="checkbox" /> {t}</label>
                              ))}
                            </div>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-secondary">บันทึกการส่งตรวจ</button>
                  </div>
                </div>
              </div>

              <div className="row2">
                <div className="selected-tests">
                  <div className="panel-title">รายการตรวจวินิจฉัย :</div>
                  <div className="selected-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ width: 140 }}>รหัสการตรวจ</th>
                          <th>ชื่อการตรวจ</th>
                        </tr>
                      </thead>
                      <tbody id="selected-tests-body">
                        <tr><td>—</td><td>ยังไม่มีรายการ</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
